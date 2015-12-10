setup:
	git config core.fileMode false
	cd frontend && npm install
	cd frontend && bower install
	cd server && npm install

watch:
	NODE_ENV=development gulp
