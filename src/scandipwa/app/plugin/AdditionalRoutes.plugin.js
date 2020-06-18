import GoogleTagManager from '../component/GoogleTagManager';
import { BEFORE_ITEMS_TYPE } from 'Component/Router/Router.component';

const addGtmComponent = (member, context) => {
    const maxPosition = Math.max(
        member.map(route => route.position).filter(num => num <= 1000)
    );

    return [
        ...member,
        {
            component: <GoogleTagManager />,
            position: maxPosition + 10
        }
    ];
};

const config = {
    'Component/Router/Component': {
        'member-property': {
            [BEFORE_ITEMS_TYPE]: addGtmComponent
        }
    }
};

export default config;
