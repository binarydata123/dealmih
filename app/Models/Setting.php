<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
     use HasFactory;
     protected $table='settings';  
     protected $fillable = [
        'admin_link', 'developer_link', 'favicon', 'site_logo', 
        'facebook_link', 'twitter_link', 'instagram_link', 
        'youtube_link', 'tiktok_link','contact_no','address'
     ];

     // Make this method static
     public static function getSettingData(){
        return self::where('id', '1')->first();
     }
}