<?php

// [ Api 应用入口文件 ]
namespace think;

require __DIR__ . '/../vendor/autoload.php';

// 执行HTTP应用并响应
$http = (new App())->http;

$response = $http->name('api')->run();;

$response->send();

$http->end($response);
