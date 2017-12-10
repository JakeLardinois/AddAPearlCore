import { environment } from './environments/environment';

export class Config {
    public static get webApiUrl() {
        if (environment.production) {
            return 'http://addapearl.integralswsolutions.com:9000/api';
        }
        return 'http://localhost:19750/api';
    }
}