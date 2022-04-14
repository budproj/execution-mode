#!/bin/bash
Red='\033[0;31m'
Green='\033[0;32m'
Color_Off='\033[0m'

initiate_env_file () {
  echo "Copying .env.example to .env"
  cp .env.example .env

  echo -e "${Green}Awesome! .env is now configured.${Color_Off}"
}

check_env_file () {
  echo "Checking .env file"
  if [ ! -f ".env" ]; then
    initiate_env_file
  else
    echo ".env file exists, skipping"
  fi
  echo
}

run() {
  check_env_file

  echo -e "${Green}Awesome! everything is now configured and dependencies are running, just start the application. with 'npm run start:dev'${Color_Off}"
  echo "just don't forget to execute the business project too"
  echo 
}

run