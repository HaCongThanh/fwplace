<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{

    protected $fillable = [
        'name',
        'image',
        'total_seat',
        'seat_per_row',
    ];

    protected $guarded = ['id'];

    public function users()
    {
        return $this->hasMany('App\User', 'workspace_id');
    }
    
    public function locations()
    {
        return $this->hasMany('App\Models\Location', 'workspace_id');
    }

    public function getPhotoAttribute()
    {
        return asset(config('site.workspace.display-image') . $this->image);
    }

    public function workSchedules()
    {
        return $this->hasManyThrough('App\Models\WorkSchedule', 'App\User');
    }

    public function delete()
    {
        if ($this->users()->count() > 0) {
            return false;
        }
        $this->locations()->delete();

        return parent::delete();
    }

    public function getTotalUserAttribute()
    {
        $total = $this->users()->count();
        
        return $total;
    }
}
