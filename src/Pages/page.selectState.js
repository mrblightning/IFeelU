import React from 'react';
/*SwitchSelector is what allows single selection out of multiple options */
import SwitchSelector from 'react-native-switch-selector';

const GeneralFeeling = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' }    
];

const GeneralFeelingSwitch = ({ match }) => {
    console.log("GeneralFeeling");
    return (
        <div>
            <SwitchSelector options={GeneralFeeling} initial={3} onPress={value => console.log(`Call onPress with value: ${value}`)} />
        </div>
    )
}

// import MultiSwitch from 'rn-slider-switch';

// const GeneralFeelingSwitch = ({ match }) => {
//     return (
//         <div>
//             <MultiSwitch currentStatus={'Open'}
//                     disableScroll={value => {
//                         console.log('scrollEnabled', value);
//                         // this.scrollView.setNativeProps({
//                         //     scrollEnabled: value
//                         // });
//                     }}
//                     isParentScrollEnabled={false}
//                     onStatusChanged={text => {
//                         console.log('Change Status ', text);
//                     }}/>
//         </div>
//     )
// }

export default GeneralFeelingSwitch
