const errorHandle = (req: any, res: any, next: any, err: any) => {
    console.log('Something went wrong!');
    console.error(err);
}

export default errorHandle;