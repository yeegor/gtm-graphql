/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { CHECKOUT } from 'Component/Header/Header.config';
import { THANK_YOU } from '../../plugin/GTMHocWrapper.plugin';

class GoogleTagManagerRouteWrapper extends PureComponent {
    static propTypes = {
        route: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        route: ''
    };

    componentDidMount() {
        const { route } = this.props;

        window.currentRouteName = route;
    }

    componentDidUpdate(prevProps) {
        const { route } = prevProps;
        const { location: { pathname } } = this.props;

        if (route === CHECKOUT && /[^/]*$/.exec(pathname)[0] === 'success') {
            window.currentRouteName = THANK_YOU;
        }
    }

    render() {
        const { children } = this.props;

        return children;
    }
}

export default withRouter(GoogleTagManagerRouteWrapper);
