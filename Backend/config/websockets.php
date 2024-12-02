<?php

return [
    'dashboard' => [
        'port' => env('LARAVEL_WEBSOCKETS_PORT', 6001),
    ],

    'apps' => [
        [
            'id' => env('PUSHER_APP_ID', '12345'),
            'name' => env('APP_NAME'),
            'key' => env('PUSHER_APP_KEY', 'local-key'),
            'secret' => env('PUSHER_APP_SECRET', 'local-secret'),
            'path' => env('PUSHER_APP_PATH', ''),
            'capacity' => null,
            'enable_client_messages' => false,
            'enable_statistics' => true,
        ],
    ],

    'allowed_origins' => [
        // Add your frontend URL
        'http://localhost:3000'
    ],

    'max_request_size_in_kb' => 250,

    'path' => 'laravel-websockets',

    'middleware' => [
        'web',
        // 'auth', // Uncomment if you want to protect the dashboard
    ],

    'statistics' => [
        'model' => \BeyondCode\LaravelWebSockets\Statistics\Models\WebSocketsStatisticsEntry::class,
        'interval_in_seconds' => 60,
        'delete_statistics_older_than_days' => 60,
    ],

    'ssl' => [
        'local_cert' => env('LARAVEL_WEBSOCKETS_SSL_LOCAL_CERT', null),
        'local_pk' => env('LARAVEL_WEBSOCKETS_SSL_LOCAL_PK', null),
        'passphrase' => env('LARAVEL_WEBSOCKETS_SSL_PASSPHRASE', null),
    ],

    'handlers' => [
        \BeyondCode\LaravelWebSockets\Statistics\DnsResolver::class => new \BeyondCode\LaravelWebSockets\Statistics\DnsResolver,
    ],
];