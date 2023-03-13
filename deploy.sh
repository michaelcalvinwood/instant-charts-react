#!/bin/bash
npm run build
rsync -a ./build/ root@charts.pymnts.com:/var/www/charts.pymnts.com/
