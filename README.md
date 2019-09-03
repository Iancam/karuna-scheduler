# karuna-scheduler

The output from test demonstrates what I believe to be the intended functionality
of the scheduler.

This can be deployed as a serverless function for free very easily (`now deploy`), but it 
needs a way to store about 10 bytes of state. Depending on the calling client,
that could be accomplished in the authorization header of their request. Otherwise, this
state can be stored for pennies on an s3 instance. 

Using a dedicated server simplifies things. State can be written directly to disk, and
there is no need for a cron scheduler. It also lets us add custom functionality. As a 
small example, we could run arbitrary scheduling code directly from this service, or
drive custom interactions on the dashboard. 

a t2.nano instance on aws would cover our needs, at a cost about $4/month.

## Todo
decide on the storage of state
