module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel',
  {
    moduleName: 'react-native-dotenv',
  }],
  };
};
