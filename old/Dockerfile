FROM nginx

WORKDIR /app

ADD common/slate/Gemfile /app/Gemfile
ADD common/slate/Gemfile.lock /app/Gemfile.lock

ADD common/bin/slatedirs /
ADD common/bin/build.sh /
ADD common/bin/run.sh /
ADD common/bin/watch.sh /

ADD home /app/home

ADD api-reference /app/api-reference
ADD elasticsearch-cookbook /app/elasticsearch-cookbook
ADD guide /app/guide
ADD plugin-reference /app/plugin-reference
ADD real-time-filters /app/real-time-filters
ADD sdk-reference /app/sdk-reference
ADD validation-reference /app/validation-reference

RUN apt-get update \
    && apt-get install -yq \
      ruby \
      ruby-dev \
      build-essential \
      git \
      inotify-tools \
    && gem install --no-ri --no-rdoc \
      bundler \
    && bundle install \
    && apt-get clean \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

RUN chmod +x /build.sh
RUN chmod +x /run.sh
RUN chmod +x /watch.sh

CMD ["/run.sh"]
