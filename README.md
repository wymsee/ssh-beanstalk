# ssh-beanstalk
Node script to ssh into an ec2 instance belonging to an elastic beanstalk environment

## Credentials

Put your credentials in `~/.aws/credentials`.  The file should look like:

    [default]
    aws_access_key_id = ...
    aws_secret_access_key = ...
    
## Installation

    npm install -g ssh-beanstalk
    
## Usage

Let's say you have an environment named my-website in region us-west-2:

    ssh-beanstalk my-website --region us-west-2 -i ~/path/to/key.pem

`ssh-beanstalk --help` for all options.  You can also pass any normal ssh parameters such as `-i` or `-L`