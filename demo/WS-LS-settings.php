<?php
// require_once('WS_Lightbox_initial.class.php');

Class WS_Lightbox_Slider {

    private $settings = array(
        'enable' => [
            'arrows',
            'dots',
            'count',
            'caption',
            'selector',
            'wrapper',
            'share',
            'playback',
            'zoom',
            'close' // always enable
        ],
        'caption' => [ 'title', 'description' ],
        'buttons' => [
            'size '         => 50,
            'style'         => 'square', // ( default, square, circle, rounded )
            'color'         => 'black',
            'color_icon'    => 'white',
            'border_width'  => 0,
            'border_color'  => '',
            'opacity'       => .5,
            'hover_opacity' => 1
        ],
        'arrows' => [
            'position'      => 'outside', // ( inside, outside, attached )
            'style'         => 'svelt', // (default, square, circle, rounded, svelt)
            'icon_style'    => 'caret', // (default, caret, angle, chevron)
            'icon_size'     => 24,
            'opacity'       => .5,
            'hover_effect'  => 'translate', // (zoom, shrink, translate)
            'hover_opacity' => .8
        ],
    
        'positions' => [
            'pos_shareButton'       => [ 'top_right' , 'outside'], // (top or bottom, right or left) // (outside, inside, attached-X, attached-Y)
            'pos_zoomButton'        => [ 'top_right', 'outside'],
            'pos_wrapperButton'     => [ 'bottom_left', 'outside'],
            'pos_count'             => [ 'bottom_center', 'outside'],
            'pos_playbackButton'    => [ 'top_left', 'attached-X'],
            'pos_selector'          => [ 'bottom', 'attached'],
            'pos_closeButton'       => [ 'top_right', 'outside' ]
        ],

        'box_positions' => [
            // example
            // 'box_top_right_outside'     => 'stack', // (stack or align)
            'box_top_right_outside'     => 'stack',
            'box_bottom_right_outside'  => 'align',
            'box_bottom_left_inside'    => 'stack'
        ],

        'selector_arrows' => [
            'color'         => 'black',
            'color_icon'    => 'white',
            'style'         => 'svelt',
            'icon_style'    => 'angle',
            'icon_size'     => 24,
            'opacity'       => .2,
            'hover_effect'  => 'translate',
            'hover_opacity' => .5
        ],

        'dots' => [
            'style'             => 'square',
                'size'          => 6,
                'spacing'       => 3,
                'color'         => 'black',
                'border_width'  => 0,
                'border_color'  => '',
                'opacity'       => .3,
                'hover_effect'  => 'zoom',
                'actived'       => [
                    'color'         => 'black',
                    'border_color'  => '',
                    'opacity'       => 1
                ]
        ],
        'selector' => [
            'size'          => 130,
            'padding'       => 5,
            'margin'        => 10,
            'gap'           => 5,
            'bg_color'      => 'black',
            'bg_opacity'    => 0,
            'border_color'  => 'black',
            'border_width'  => 1,
            'border_radius' => 0,
            'opacity'       => .5,
            'hover'         => [
                'border_color'  => 'lightgrey',
                'opacity'       => .8
            ],
            'actived'       => [
                'border_color'  => 'white',
                'opacity'       => 1
            ]
        ],

        'background' => [
            'filter'  => 'image',
            'opacity' => .5
        ],
        'image' => [
            'border_radius' => 0,
            'border_color'  => '',
            'border_width'  => 0,
            'bg'            => 'none'
        ],

        'social_networks' => [
            'domain'       => 'http://localhost:8888/lightbox-v2',
            'twitter'  => [
                'username'      => 'Walker Spider',
                'color'         => '#55acee',
                'icon'          => 'fab fa-twitter',
                'color_icon'    => 'white'
            ],
            'facebook' => [
                'color'         => '',
                'icon'          => 'fab fa-facebook-f',
                'color_icon'    => '#3b5998'
            ],
            'pinterest' => [
                'color'         => '',
                'icon'          => 'fab fa-pinterest',
                'color_icon'    => '#bd081c'
            ]
        ],
        'velocities' => [
            'display_velocity'  => 'low',
            'slide_velocity'    => 'normal',
            'autoplay_velocity' => 'normal'
        ]
    );

    // public function init() {
    //     return $this->settings;
    // }

    // public function newSettings($post) {
    //     var_dump($post);
    // }

    public function display() {
        $settings = $this->settings;
        // $settings['buttons']['size'] = 20;

        // ENABLE 
        $enable = [];
        foreach ($settings['enable'] as $enable) {
            $enables[] = "'".$enable."'";
        }
        echo 'enable:['.implode(', ', $enables).'],';

        // POSITIONS POS_
        foreach ($settings['positions'] as $position => $value) {
            echo $position.':['.'"'.$value[0].'"'.', '.'"'.$value[1].'"'.'], ';
        }

        // BOX POSITIONS 
        foreach ($settings['box_positions'] as $box => $value) {
            echo $box.':'."'".$value."',";
        }

        // CAPTION
        $captions = [];
        foreach ($settings['caption'] as $caption) {
            $captions[] = "'".$caption."'";
        }
        echo 'caption : ['.implode(', ', $captions).'],';

        // BUTTONS
        $buttons = []; 
        foreach ($settings['buttons'] as $button => $value) {
            $buttons[] = $button.' : '.'"'.$value.'"' ;
        }
        echo 'buttons : { '.(implode(', ', $buttons)). '},' ;

        // ARROWS
        $arrows = [];
        foreach ($settings['arrows'] as $arrow => $value) {
            $arrows[] = $arrow.':'."'".$value."'";
        }
        echo 'arrows : { '.implode(', ', $arrows). '},' ;

        // SELECTOR ARROWS
        $selector_arrows = [];
        foreach ($settings['selector_arrows'] as $selector_arrow => $value) {
            $selector_arrows[] = $selector_arrow.':'."'".$value."'";
        }
        echo 'selector_arrows : { '.implode(', ', $selector_arrows).'},';

        // DOTS
        $dots = [];
        foreach ($settings['dots'] as $dot => $value) {
            if ( $dot === 'actived' ) {
                $dot_actived = [];
                foreach ($settings['dots']['actived'] as $dot_act => $value) {
                    $dot_actived[] = $dot_act.':'."'".$value."'";
                }
                $dots[] = 'actived : { '.implode(', ', $dot_actived).'}';
            } else {
                $dots[] = $dot.':'."'".$value."'";
            }
        }
        echo 'dots : { '.implode(', ', $dots).'},';

        // SELECTOR
        $selectors = [];
        foreach ($settings['selector'] as $selector => $value) {
            if ( $selector === 'hover' ) {
                $sel_hover = [];
                foreach ($settings['selector']['hover'] as $sel_h => $value) {
                    $sel_hover[] = $sel_h.':'."'".$value."'";
                }
                $selectors[] = 'hover : { '.implode(', ', $sel_hover).'}';
            }
            elseif ( $selector === 'actived' ) {
                $sel_actived = [];
                foreach ($settings['selector']['actived'] as $sel_act => $value) {
                    $sel_actived[] = $sel_act.':'."'".$value."'";
                }
                $selectors[] = 'actived : {'.implode(', ', $sel_actived).'}'; 
            } else {
                $selectors[] = $selector.':'."'".$value."'";
            }
        }
        echo 'selector : { '.implode(', ', $selectors).'}, ';

        // BACKGROUND APP
        $backgrounds = [];
        foreach($settings['background'] as $background => $value) {
            $backgrounds[] = $background.":'".$value."'";
        }
        echo 'background : {'.implode(', ', $backgrounds).'}, ';

        // IMAGE APP
        $image_app = [];
        foreach ($settings['image'] as $image => $value) {
            $image_app[] = $image.":'".$value."'";
        }
        echo 'image : { '.implode(', ', $image).'}, ';

        // SOCIAL NETWORK
        $social_networks = [];
        foreach ($settings['social_networks'] as $social_n => $value) {
            if ( $social_n === 'twitter' ) {
                $_twitter = [];
                foreach ($settings['social_networks']['twitter'] as $twitter => $value) {
                    $_twitter[] = $twitter.":'".$value."'";
                }
                $social_networks[] = 'twitter : { '.implode(', ', $_twitter)."}";
            }
            elseif ( $social_n === 'facebook' ) {
                $_fb = [];
                foreach ($settings['social_networks']['facebook'] as $fb => $value) {
                    $_fb[] = $fb.":'".$value."'";
                }
                $social_networks[] = 'facebook : { '.implode(', ', $_fb).'}';
            }
            elseif ( $social_n === 'pinterest' ) {
                $_pinterest = [];
                foreach ($settings['social_networks']['pinterest'] as $pinterest => $value) {
                    $_pinterest[] = $pinterest.":'".$value."'";
                }
                $social_networks[] = 'pinterest : { '.implode(', ', $_pinterest).'}';
            } else {
                $social_networks[] = $social_n.":'".$value."'";
            }
        }
        echo 'social_networks : { '.implode(', ', $social_networks).'}';
        
    }
}
