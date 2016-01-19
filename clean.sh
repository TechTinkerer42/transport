find app -name "*.js" -exec rm -f {} \;
find app -name "*.js.map" -exec rm -f {} \;
rm -rf jspm_packages;
rm -rf node_modules;
rm -rf .sass-cache;
rm -rf css/style.css*;
rm -rf app/types;

