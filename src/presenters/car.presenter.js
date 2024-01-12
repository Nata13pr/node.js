module.exports = {
       carPresenter : ( car ) => {
              return {
                     _id : car._id,
                     brand : car.brand,
                     email : car.email,
                     year : car.year,
                     createdAt : car.createdAt,
                     updatedAt : car.updatedAt,
              };
       },
};
