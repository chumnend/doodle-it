API_DIR=apps/doodle-it-api
UI_DIR=apps/doodle-it-ui

install: 
	yarn

env:
	cp $(API_DIR)/.env.example $(API_DIR)/.env
	cp $(UI_DIR)/.env.example $(UI_DIR)/.env

setup: install env

run:
	yarn dev

clean:
	rm -f ${API_DIR}/.env
	rm -f ${UI_DIR}/.env

help:
	@echo "Available targets:"
	@echo "  install       Install dependencies using yarn"
	@echo "  setup-env     Copy .env.example files to .env for both API and UI"
	@echo "  setup         Install dependencies and setup environment files"
	@echo "  run           Start the application in development mode"
	@echo "  clean         Remove generated .env files"
	@echo "  help          Display this help message"
