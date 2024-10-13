# Load Balancing Testbed
This is an implementation of a testbed for validating and optimizing load balancing in a system architectural design.

The testbed takes as input a system configuration represents as follows:

 ```yaml
 config = {
        LoadBalancingAlgorithm: <value>,
        NoServers: <value>,
        Replicas: <value>,
        MaxNoSessionsPerServer: <value>,
        MinNoSessionsPerServer: <value>,
        MaxProcessingTime: <value>, //seconds
        MinProcessingTime: <value>, //seconds
        NoDatastores: <value>,
        MaxDatastoreSpace: <value>, //GB
        MinDatastoreSpace: <value>, //MB
        MaxSizeRequestPayload: <value>, //MB
        MinSizeRequestPayload: <value>, //MB
    }
```

Given an configuration instance, the aim is to verify the limits of the system in its ability to be highly-available, resilient and to withstand a denial of service attack. 

The effectiveness of a configuration is measured by the frequency of server denial of access either due to lack of servers to handle new sessions or not enough space in the datastore to handle user request payload.