const { withNx } = require('@nx/next/plugins/with-nx');
const withNextIntl = require('next-intl/plugin')();

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'standalone',
  async redirects() {
    return [];
  },
};

module.exports = withNx(withNextIntl(nextConfig));
