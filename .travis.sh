pushd api-reference
bundle exec middleman build
popd

pushd dsl-reference
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
