<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskAssigned implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $task;
    public $notification;

    /**
     * Create a new event instance.
     */
    public function __construct($task, $notification)
    {   
        $this->task = $task;
        $this->notification = $notification;
        \Log::info('Evento TaskAssigned emitido', ['notification' => $notification]);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */

    public function broadcastOn()
    {
        \Log::info('Sbscrito al canal', ['task-channel' => $this->notification->user_id]);
        return new Channel('task-channel.' . $this->notification->user_id);
    }

    /*public function broadcastOn()
    {
        return new PrivateChannel('private-user.' . $this->notification->user_id); //Canal privado para el usuario asignado
    }*/

    public function broadcastAs()
    {
        return 'task.assigned';
    }
}
