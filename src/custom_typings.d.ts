
interface Window {
  jwt_decode(jwt: string): any;
}

declare var io : {
    connect(url: string): Socket;
}
interface Socket {
    on(event: string, callback: (data: any) => void );
    emit(event: string, data: any);
}