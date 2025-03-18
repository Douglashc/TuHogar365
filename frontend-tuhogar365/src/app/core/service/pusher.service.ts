import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
    providedIn: 'root'
})
export class PusherService {

    pusher: any;
    channelNotification: any;
    channelData: any;

    constructor() {
        this.pusher = new Pusher('bf9db25cb25506102c5a', {
            cluster: 'us2',
        });
    }

    listenToNotifications(userId: string, callback: (notification: any) => void) {
        this.channelNotification = this.pusher.subscribe(`task-channel.${userId}`);
        this.channelNotification.bind('task.assigned', (data: any) => {
            console.log('Evento recibido:', data?.notification); // Verifica si llega aquí
            callback(data?.notification);
        });
    }

    listenToData(userId: string, callback: (notification: any) => void) {
        this.channelData = this.pusher.subscribe(`task-channel.${userId}`);
        this.channelData.bind('task.assigned', (data: any) => {
            console.log('Evento recibido:', data?.task); // Verifica si llega aquí
            callback(data?.task);
        });
    }

    unsubscribeChannel() {
        if (this.channelData) {
            this.channelData.unbind_all();
            this.channelData.unsubscribe();
            this.channelData = null;
        }
    }
}
