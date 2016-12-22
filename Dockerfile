FROM nginx

WORKDIR /app

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

ADD index.html /usr/share/nginx/html/

ADD run.sh /
ADD watch.sh /

ADD guide /app/guide
ADD sdk-reference /app/sdk-reference
ADD dsl-reference /app/dsl-reference
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

RUN chmod +x /run.sh
RUN chmod +x /watch.sh

CMD ["/run.sh"]
