<?php

use Kirby\Cms\App;

App::plugin('johannschopplich/punctuation-section', [
    'sections' => require __DIR__ . '/src/extensions/sections.php'
]);
