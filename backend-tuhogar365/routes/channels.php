<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    \Log::info($user);
    return (int) $user->id === (int) $id;
});

Broadcast::channel('private-user.{userId}', function ($user, $userId) {
    \Log::info('Authentication middleware triggered');
    if (!$user) {
        \Log::info('User not authenticated');
        return false;
    }

    \Log::info('Broadcasting auth route hit');
    \Log::info('User ID: ' . $user->id . ' (Type: ' . gettype($user->id) . ')');
    \Log::info('Requested userId: ' . $userId . ' (Type: ' . gettype($userId) . ')');

    $result = (int) $user->id === (int) $userId;
    \Log::info('Result of comparison: ' . ($result ? 'true' : 'false'));

    return $result;
});
