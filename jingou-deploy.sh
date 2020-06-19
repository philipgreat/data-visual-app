git pull
git checkout jingou
yarn build
rsync -avz build/*    jingou@wxapp1.xhl365.cn:/home/jingou/resin/resin-3.1.16/webapps/ROOT/datacompass/jingou/
