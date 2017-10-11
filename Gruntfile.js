module.exports = function(grunt) {
    // 加载插件
    [
        'grunt-contrib-copy',
        'grunt-contrib-concat',
        'grunt-contrib-cssmin',
        'grunt-contrib-uglify',
        'grunt-contrib-jshint',
        'grunt-contrib-csslint',
        'grunt-contrib-imagemin',
        'grunt-contrib-less',
        'grunt-contrib-watch',
    ].forEach(function(task){
       grunt.loadNpmTasks(task);
    });
    // 配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //复制用包管理工具安装的库或文件到vendor目录下
        copy: {
            main: {
                files: [
                    //copy bootstrap
                    {
                        expand: true,flatten: true,
                        src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
                        dest: 'public/vendor/bootstrap/dist/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,flatten: true,
                        src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
                        dest: 'public/vendor/bootstrap/dist/js/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,flatten: true,
                        src: ['bower_components/bootstrap/dist/fonts/*.*'],
                        dest: 'public/vendor/bootstrap/dist/fonts/',
                        filter: 'isFile'
                    },
                    //copy jquery
                    {
                        expand: true,flatten: true,
                        src: ['bower_components/jquery/dist/jquery.min.js'],
                        dest: 'public/vendor/jquery/dist/',
                        filter: 'isFile'
                    },
                    //copy validator
                    {
                        expand: true,flatten: true,
                        src: ['node_modules/validator/validator.min.js'],
                        dest: 'public/vendor/validator/',
                        filter: 'isFile'
                    },
                ],
            },
        },
        //合并 CSS 文件
        concat: {
            css: {
                src: ['public/stylesheets/style/*.css',
                    'public/stylesheets/less/main.css',
                ],
                /* 根据目录下文件情况配置 */
                dest: 'public/stylesheets/dist/<%= pkg.name %>.css'
            },
            scripts: {
                src: ['public/javascripts/*.js',],
                /* 根据目录下文件情况配置 */
                dest: 'public/javascripts/dist/<%= pkg.name %>.js'
            },
        },
        //压缩Style CSS文件为 .min.css
        cssmin: {
            options: {
                // 移除 CSS 文件中的所有注释
                keepSpecialComments: 0
            },
            minify: {
                expand: true,
                //原文件路径
                cwd: 'public/stylesheets/dist/',
                src: ['firstobj.css'],
                //压缩的文件位置
                dest: 'public/stylesheets/dist/',
                ext: '.min.css'
            }
        },
        // 最小化、混淆、合并 JavaScript 文件
        uglify: {
            build: {
                //src: 'src/<%= pkg.name %>.js',
                src: 'public/javascripts/dist/<%= pkg.name %>.js',
                dest: 'public/javascripts/dist/<%= pkg.name %>.min.js'
            }
        },
        //检查Style CSS 语法
        csslint: {
            src: ['public/stylesheets/style/one.css']
        },
        //检查javascript语法
        jshint: {
            all: ['Gruntfile.js',
                'public/javascripts/*.js'
            ]
        },
        //压缩优化图片大小
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {
                        expand: true,
                        cwd: 'public/images/',
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: 'public/images/' // 优化后的图片保存位置，默认覆盖
                    }
                ]
            }
        },
        //将Less文件编译成Css文件
        less: {
            development: {

                files: {
                    'public/stylesheets/less/main.css': 'public/stylesheets/less/main.less',
                }
            }
        },
        //监控CSS和js文件的变化，只要有修改就检查语法
        watch: {
            css: {
                files: 'public/stylesheets/style/*.css',
                tasks: ['csslint'],
                options: {
                    //livereload: true,
                    spawn: false,
                }
            },
            scripts: {
                files: 'public/javascripts/*.js',
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            }
        }
    });
    // 默认任务
    grunt.registerTask('default',
        ['copy','less','concat','cssmin','uglify','imagemin']);
};