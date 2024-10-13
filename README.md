# Load Balancing Testbed
This is an implementation of a testbed for validating and optimizing load balancing in a system architectural design.

The testbed takes as input a system configuration represents as follows:

 ```json
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