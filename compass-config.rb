http_path = "build/public"
css_dir = "build/public/style"
sass_dir = "src/public/style"
images_dir = "build/public/gfx"
fonts_dir = "build/public/fonts"
javascripts_dir = "build/public/scripts"

output_style = (environment == :development) ? :expanded : :compressed
relative_assets = true
