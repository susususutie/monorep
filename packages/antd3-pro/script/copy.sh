#!/bin/bash

# script_dir=$(dirname $(realpath "$0"))
# cd "$script_dir"

# 定义源目录和目标目录
src_dir="lib"

# 获取第一个参数(目标目录)
dist_dir_input="$1"

# 判断参数是否为 'esm' 或 'cjs'
if [ "$dist_dir_input" == "esm" ] || [ "$dist_dir_input" == "cjs" ]; then
    # 如果是，则将其赋值给变量 dist_dir
    dist_dir="$dist_dir_input"
else
    # 如果不是，则将默认值 'esm' 赋值给变量 dist_dir
    dist_dir="esm"
fi

# 创建目标目录(如果不存在)
mkdir -p "$dist_dir"

# 遍历源目录下的所有子目录
for dir in "$src_dir"/*; do
    if [ -d "$dir" ]; then
        # 创建与源子目录同名的目标子目录
        subdir_name=$(basename "$dir")
        mkdir -p "$dist_dir/$subdir_name"

        # 复制源子目录下的 svg 和 png 文件到目标子目录
        cp -r "$dir"/*.{svg,png,css,module.css} "$dist_dir/$subdir_name/" 2>/dev/null
    fi
done

echo "copy end!"