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

RUN cd /app/guide \
  && bundle exec middleman build \
  && ln -s /app/guide/build /usr/share/nginx/html/guide \
&& cd /app/sdk-reference \
  && bundle exec middleman build \
  && ln -s /app/sdk-reference/build /usr/share/nginx/html/sdk-reference \
&& cd /app/dsl-reference \
  && bundle exec middleman build \
  && ln -s /app/dsl-reference/build /usr/share/nginx/html/dsl-reference \
&& cd /app/validation-reference \
  && bundle exec middleman build \
  && ln -s /app/validation-reference/build /usr/share/nginx/html/validation-reference \

RUN chmod +x /run.sh
RUN chmod +x /watch.sh

CMD ["/run.sh"]
