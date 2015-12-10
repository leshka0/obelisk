shelljs = require 'shelljs/global'

cmds = []

path = './obj'

for file, i in ls './obj/*.obj'

	name = file.replace '.obj', ''

	cmds.push "python convert_obj_three.py -i #{file} -o #{name}.js"

run = (cmds) =>

	if cmds.length is 0
		echo 'done'
		return

	cmd = cmds.shift()

	exec cmd, (code, output) ->
		run cmds

run cmds