import React from 'react'

const Images: React.FC <{
    user: any
    button?: any
}> = props => {

    return (

        <div className="row" style={{ padding: '15px' }}>
            {props.user.length > 0 && props.user.map((elm: any) => {
                return (
                    <div className="col-lg-4" >
                        <div className="card">

                            <div className="card-header">
                                <div className="utils__title">
                                    <strong>{elm.alt_description ? elm.alt_description : 'Image'}</strong>
                                    &nbsp; &nbsp;
                                    {props.button ? props.button(elm) : ''}
                                </div>

                            </div>

                            <div
                                className="card-body padding-15"
                                style={{
                                    minHeight: '50vh',
                                }}
                            >
                                <img
                                    src={elm.urls.thumb ? elm.urls.thumb : elm.urls.small}
                                    alt={elm.alt_description ? elm.alt_description : 'Image'}
                                />
                            </div>
                        </div>
                        <br />
                    </div>
                )
            })}
        </div>
    )
}

export default Images

