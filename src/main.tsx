import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
    // const { asyncUseLoading, loadingEventTarget } = useLoading()

    // const handleLoad = async () => {
    //     loadingEventTarget.addEventListener('change', (e: any) => {
    //         console.log('loading changed', e.detail.isLoading)
    //     });
    //     asyncUseLoading(new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             reject("hello")
    //         }, 10000);
    //     }))
    //     console.log(await asyncUseLoading(new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             reject("hello")
    //         }, 6000);
    //     })))
    // }

    return (
        <div style={{ padding: '20px' }}>
            <h1>roks-rjs-palawanuicomponents Dev</h1>
        </div>
    )
}

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <LoadingProvider wrapperStyle={{ backdropFilter: 'blur(3px)' }} animationType={AnimationType.Spin} animationDuration={1} >
//             <App />
//         </LoadingProvider>
//     </React.StrictMode>,
// )