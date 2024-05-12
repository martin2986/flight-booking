import axios from 'axios';
import { flightClient } from './auth/apiClient';
const { CancelToken } = axios;

export const search = (input: string) => {
  if (input) {
    try {
      const source = CancelToken.source();
      const request = flightClient.get(`/auto-complete?query=${input}`, {
        cancelToken: source.token,
      });
      return {
        async process(callback: (data: any) => void) {
          request.then((response) => {
            const json = response.data;
            if (json && json.data) {
              callback(
                json.data.map((data: any) => {
                  return {
                    id: data.id,
                    city: data.navigation.localizedName,
                  };
                }),
              );
            }
          });
        },
        cancel() {
          source.cancel();
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
  return {
    process() {
      return [];
    },
    cancel() {},
  };
};
