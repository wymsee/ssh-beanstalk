#!/usr/bin/env node
'use strict';

const argv = require('yargs')
    .usage('$0 <environment> [args]')
    .demand(1, 'You must enter an elasticbeanstalk environment name')
    .option('region', {
        alias: 'r',
        describe: 'AWS region',
        default: 'us-east-1'
    })
    .option('user', {
        alias: 'u',
        describe: 'User name for ec2 instance',
        default: 'ec2-user'
    })
    .help('help')
    .argv;
    
const aws = require('aws-sdk');

aws.config.update({region: argv.region});

let elasticbeanstalk = new aws.ElasticBeanstalk({apiVersion: '2010-12-01'});

elasticbeanstalk.describeEnvironmentResources({EnvironmentName: argv._[0]}, function(err, data) {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    
    let instance = data.EnvironmentResources.Instances[0];
    
    let ec2 = new aws.EC2({apiVersion: '2015-10-01'});
    ec2.describeInstances({
        InstanceIds: [instance.Id]
    }, function(err, data) {
        if (err) {
            console.error(err.message);
            process.exit(1);
        }
        
        let dns = data.Reservations[0].Instances[0].PublicDnsName;
        
        let ssh = `ssh ${argv.user}@${dns}`;
        
        Object.keys(argv).forEach((key) => {
            if (['_', 'help', 'region', 'r', 'user', 'u', '$0'].indexOf(key) === -1) {
                if (key.length > 1) {
                    ssh += ` --${key} ${argv[key]}`;
                } else {
                    ssh += ` -${key} ${argv[key]}`;
                }
            }
        });
            
        console.log(ssh);
    });
});