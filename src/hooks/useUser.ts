export function useUser() {
  return {
    // @ts-ignore: Object is possibly 'null'.
    id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id,
  };
}
