pushd api-reference
bundle exec middleman build
popd

pushd real-time-filters
bundle exec middleman build
popd

pushd guide
bundle exec middleman build
popd

pushd sdk-reference
bundle exec middleman build
popd

pushd validation-reference
bundle exec middleman build
popd

pushd elasticsearch-cookbook
bundle exec middleman build
popd

pushd plugin-reference
bundle exec middleman build
popd
