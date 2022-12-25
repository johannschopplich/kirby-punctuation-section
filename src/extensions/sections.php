<?php

return [
    'punctuation' => array_replace_recursive(
        include \Kirby\Cms\Section::$types['info'],
        [
            'props' => [
                'fieldsets' => function (array $value = []) {
                    return $value;
                }
            ]
        ]
    )
];
