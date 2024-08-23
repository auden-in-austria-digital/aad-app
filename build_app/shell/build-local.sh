# bash/bin

echo "fetch data"
./build_app/shell/fetch_data.sh
./build_app/shell/fetch_data_entities.sh

echo "install packages"
./build_app/shell/script.sh

echo "reorganize data"
ant -f ./build_app/ant/copy-task.xml

echo "install python requirements and run python scripts"
source env/bin/activate
pip install -U pip
pip install -r ./build_app/python/requirements.txt
./build_app/shell/attributes.sh
./build_app/shell/denormalize.sh

echo "build app"
ant -f ./build_app/ant/build.xml