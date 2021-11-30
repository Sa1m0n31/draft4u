import React, {useEffect} from 'react'

const ReturnComponent = () => {
    useEffect(() => {
        window.setTimeout(function(){
            opener.P24_Transaction.threeDSReturn(window);
            window.close();
        },1000);
    }, []);

    return <div>

    </div>
}

export default ReturnComponent;
