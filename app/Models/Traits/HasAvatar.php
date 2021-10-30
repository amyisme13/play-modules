<?php

namespace App\Models\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasAvatar
{
    /**
     * Update the user's avatar.
     *
     * @param  \Illuminate\Http\UploadedFile  $avatar
     * @return void
     */
    public function updateAvatar(UploadedFile $avatar)
    {
        tap($this->avatar, function ($previous) use ($avatar) {
            $this->forceFill([
                'avatar' => $avatar->storePublicly('avatars', [
                    'disk' => $this->avatarDisk(),
                ]),
            ])->save();

            if ($previous) {
                Storage::disk($this->avatarDisk())->delete($previous);
            }
        });
    }

    /**
     * Delete the user's avatar.
     *
     * @return void
     */
    public function deleteAvatar()
    {
        Storage::disk($this->avatarDisk())->delete($this->avatar);

        $this->forceFill(['avatar' => null])->save();
    }

    /**
     * Get the URL to the user's avatar.
     *
     * @return string
     */
    public function getAvatarUrlAttribute()
    {
        return $this->avatar
            ? Storage::disk($this->avatarDisk())->url($this->avatar)
            : $this->defaultAvatarUrl();
    }

    /**
     * Get the default avatar URL if no avatar has been uploaded.
     *
     * @return string
     */
    protected function defaultAvatarUrl()
    {
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name);
    }

    /**
     * Get the disk that avatar should be stored on.
     *
     * @return string
     */
    protected function avatarDisk()
    {
        return 'public';
    }
}
