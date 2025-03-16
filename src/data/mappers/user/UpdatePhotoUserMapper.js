export default class UpdatePhotoUserMapper {
    static toData(dataImage) {
        
        const formData = new FormData();
        formData.append('image', dataImage);

        return formData;
    }
}