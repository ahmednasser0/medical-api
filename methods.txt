async function get(req, res, next) {
  try {
    const { Model, query } = req;
    const { q, page, populate, field, value, doctor, patient } = query;
    const limit = parseInt(query.limit) || 10;
    const defaultPage = parseInt(page) || 1;

    // if doctor or patient query has been passed
    // return data of that doctor or patient

    const filterObject = {
      name: { $regex: q || "", $options: "i" },
    };
    if (doctor) filterObject.doctor = doctor;
    if (patient) filterObject.patient = patient;
    
    if (field) filterObject[field] = value;
    const results = await Model.find(filterObject)
      .skip(limit * defaultPage - limit)
      .limit(limit)
      .populate(populate)
      .exec();
    const total = await Model.countDocuments(filterObject);
    const res_object = {
      message: "successfully data retrieved",
      success: true,
      results: results,
      total,
      notify: false,
    };
    req.res_object = res_object;
    next();
  } catch (error) {
    next(error);
  }
}
async function getOne(req, res, next) {
  try {
    const { Model, query, params } = req;
    const { populate } = query;
    const { ID } = params;
    const result = await Model.findById(ID).populate(populate).exec();

    req.res_object = {
      message: "successfully retrieved data",
      success: true,
      result: result,
      notify: false,
    };
    next();
  } catch (error) {
    next(error);
  }
}
async function create(req, res, next) {
  try {
    const { Model, query, body } = req;
    if (!Object.values(body).length)
      throw new Error(`Invalid body: ${JSON.stringify(body)}`);
    const result = await Model.create(body);

    req.res_object = {
      message: `successfully create ${result.name || result._id} `,
      success: true,
      result: result,
      notify: true,
    };
    next();
  } catch (error) {
    next(error);
  }
}
async function edit(req, res, next) {
  try {
    const { Model, query, body, params } = req;
    const { ID } = params;
    const { populate } = query;
    if (!Object.values(body).length)
      throw new Error(`Invalid body: ${JSON.stringify(body)}`);
    // update and return the new object
    const result = await Model.findByIdAndUpdate(ID, body, {
      new: true,
    })
      .populate(populate)
      .exec();

    req.res_object = {
      message: `successfully create ${result.name} `,
      success: true,
      result: result,
      notify: true,
    };
    next();
  } catch (error) {
    next(error);
  }
}
async function remove(req, res, next) {
  try {
    const { Model, query, body, params } = req;
    const { ID } = params;
    const { populate } = query;
    const result = await Model.findByIdAndDelete(ID).populate(populate).exec();
    req.res_object = {
      message: `successfully delete ${result && result.name} `,
      success: true,
      result: result,
      notify: true,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { get, create, remove, getOne, edit };
