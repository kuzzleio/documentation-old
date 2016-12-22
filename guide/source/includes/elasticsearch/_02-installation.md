## Installation

We want you to manipulate Elasticsearch while you are reading this cookbook, to do so you will need [cURL](https://curl.haxx.se/download.html), a terminal (Linux, Mac, Cygwin...) and optionally [docker](https://www.docker.com/products/docker) to speed up the installation.

You can also trust the output we provide in the cookbook and skip the installation chapter.

### Launch Elasticsearch

We provide here a way to run Elasticsearch quickly with docker, but you can do it by following the [installation documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html).


To launch Elasticsearch, copy this line in your terminal:

```sh
docker run -p 9200:9200 elasticsearch:2.3
```

(To stop Elasticsearch, you can use Ctrl-C)

The container we just launched will be accessed at the port 9200 on localhost. If you installed Elasticsearch using another method, adapt the examples provided in this cookbook to your install.

### Check that Elasticsearch is reachable

Run the following command:

```
curl -g -X GET "http://localhost:9200/"
```

You can see below an example of reply. This cookbook assumes that your Elasticsearch `version.number` is between **2.3** and **5.x**:

```
{
  "name" : "Edwin Jarvis",
  "cluster_name" : "elasticsearch",
  "version" : {
    "number" : "2.3.4",
    "build_hash" : "e455fd0c13dceca8dbbdbb1665d068ae55dabe3f",
    "build_timestamp" : "2016-06-30T11:24:31Z",
    "build_snapshot" : false,
    "lucene_version" : "5.5.0"
  },
  "tagline" : "You Know, for Search"
}
```

