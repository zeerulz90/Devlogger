import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service';
import { generate } from 'rxjs';
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    //Subscribe to the selected log observable
    this.logService.selectedLog.subscribe(log => {
      if (log.id != null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }

  onSubmit() {
    //Check if log is new or not
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }

      //Add log
      this.logService.addLog(newLog);
    } else {
      //Update existing log
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }

      //Update Log
      this.logService.updateLog(updLog);
    }

    //Clear State
    this.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.logService.clearState();
  }

}
