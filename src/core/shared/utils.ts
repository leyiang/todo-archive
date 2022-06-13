export function toSnakeCase( str : string ) : string {
    const result = str.replace( /([A-Z])/g, " $1" );
    return result.split(' ').join('_').toLowerCase();
}

export function splice( arr:any[], item:any ) {
    const index = arr.indexOf( item );
    if( index < 0 ) return;
    arr.splice(index, 1);
}

export function last( arr: any[] ) {
    return arr[ arr.length - 1 ];
}

export function format(
    formatString: string,
    date: Date | null = new Date
): string {
    if( ! date ) return "";

    const padStart = (str: any) => {
        return str.toString().padStart(2, "0");
    };

    const supportChars : {
        [index: string]: Function
    } = {
        Y: () => date.getFullYear().toString(),
        m: () => padStart( date?.getMonth() + 1),
        d: () => padStart( date?.getDate() ),
    };

    return formatString.replace(/(\\?)(.)/g, function(_, esc, chr) {
        return (esc === '' && supportChars[chr]) ? supportChars[chr]() : chr;
    });
}

export function triggerDownload( data: {}, name: string = "export.json") {
    const content = "data:text/json;charset=utf-8," + encodeURIComponent( JSON.stringify(data) );
    const link = document.createElement("a");

    link.href = content;
    link.download = name;
    link.click();
}