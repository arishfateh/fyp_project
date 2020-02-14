import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class PwaService {
  public promptEvent;
  constructor(swUpdate: SwUpdate) {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
    swUpdate.available.subscribe(() => window.location.reload());
    console.log('updated');
  }

}
